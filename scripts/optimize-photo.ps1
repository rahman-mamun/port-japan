<#
.SYNOPSIS
  Turns the full-size studio PNG into the web-ready hero portrait.

.DESCRIPTION
  Reads src/asst/"Japan Pose.png" (2048x2048, ~9.9 MB), crops a subject-centred
  square, lifts the dusk exposure so the face and suit read clearly, then writes
  src/assets/profile.jpg.

  Only src/assets/profile.jpg is imported by the app. The source PNG never ships.

  Re-run with different -Gamma / -Contrast values to retune. This script is the
  record of how the shipped image was produced -- do not hand-edit the JPEG.

.EXAMPLE
  powershell -File scripts/optimize-photo.ps1
  powershell -File scripts/optimize-photo.ps1 -Gamma 1.45 -Contrast 1.15
#>
[CmdletBinding()]
param(
  # Midtone lift. Higher = brighter. This is the main exposure control.
  [double] $Gamma = 1.30,
  # Contrast scale around mid-grey. Counteracts the flattening from Gamma.
  [double] $Contrast = 1.10,
  # Flat brightness offset, -1..1.
  [double] $Brightness = 0.02,
  # >1 cools the image, to balance the ember accent.
  [double] $BlueGain = 1.05,
  [double] $RedGain = 0.99,
  # Output edge length in pixels.
  [int] $Size = 1200,
  [int] $Quality = 84,
  # Subject-centred crop window in source pixels.
  [int] $CropX = 102,
  [int] $CropY = 337,
  [int] $CropSize = 1428
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$src = Join-Path $root 'src\asst\Japan Pose.png'
$outDir = Join-Path $root 'src\assets'
$out = Join-Path $outDir 'profile.jpg'

if (-not (Test-Path $src)) { throw "Source image not found: $src" }
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }

$img = [System.Drawing.Image]::FromFile($src)
Write-Output "source : $($img.Width)x$($img.Height)"
Write-Output "crop   : ${CropX},${CropY} ${CropSize}px -> ${Size}px"
Write-Output "tone   : gamma=$Gamma contrast=$Contrast brightness=$Brightness blue=$BlueGain"

$bmp = New-Object System.Drawing.Bitmap($Size, $Size)
$bmp.SetResolution($img.HorizontalResolution, $img.VerticalResolution)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

# Contrast pivots around mid-grey, so shift by (1-c)/2 then add brightness.
$t = ((1.0 - $Contrast) / 2.0) + $Brightness
$m = New-Object 'System.Drawing.Imaging.ColorMatrix'
$m.Matrix00 = $Contrast * $RedGain
$m.Matrix11 = $Contrast
$m.Matrix22 = $Contrast * $BlueGain
$m.Matrix33 = 1.0
$m.Matrix44 = 1.0
$m.Matrix40 = $t
$m.Matrix41 = $t
$m.Matrix42 = $t

$attr = New-Object System.Drawing.Imaging.ImageAttributes
$attr.SetColorMatrix($m)
$attr.SetGamma($Gamma)

$dest = New-Object System.Drawing.Rectangle(0, 0, $Size, $Size)
$g.DrawImage($img, $dest, $CropX, $CropY, $CropSize, $CropSize,
  [System.Drawing.GraphicsUnit]::Pixel, $attr)
$g.Dispose()
$attr.Dispose()

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
  [System.Drawing.Imaging.Encoder]::Quality, [int64]$Quality)
$bmp.Save($out, $codec, $ep)

$bmp.Dispose()
$img.Dispose()

$kb = [math]::Round((Get-Item $out).Length / 1KB, 1)
Write-Output "wrote  : src/assets/profile.jpg ${Size}x${Size} q${Quality} ${kb} KB"
