Based on the log provided, your OBS Studio is failing because the **Intel QuickSync (QSV) video encoder is crashing** when trying to start the recording.

Here is the specific error from your log at timestamp `16:03:30`:
> `[qsv encoder: 'msdk_impl'] Unsupported configurations, parameters, or features (MFX_ERR_UNSUPPORTED)`

This indicates that the specific settings OBS is trying to use for the Intel Hardware Encoder are not accepted by your current graphics driver.

### 1. The Core Issue
You are using an **11th Gen Intel i7 (Tiger Lake)** on **Ubuntu 22.04**. You have selected the `Hardware (QSV, H.264)` encoder.

When OBS initializes this encoder, it attempts to use the "High" profile with specific rate controls (`ICQ`). Your driver is rejecting this configuration (`MFX_ERR_UNSUPPORTED`), likely due to a driver incompatibility or a limitation in the Linux implementation of QSV.

### 2. Recommended Fixes

#### **Solution A: Switch to VAAPI (Recommended for Linux)**
On Linux, **VAAPI** is the native and most stable API for Intel graphics, whereas QSV is often a wrapper that can be buggy. Your log confirms your system supports VAAPI: `FFmpeg VAAPI H264 encoding supported`.

1.  Go to **Settings** > **Output**.
2.  Change **Output Mode** from Simple to **Advanced** (if needed to see the options).
3.  Look for the **Video Encoder** dropdown.
4.  Change it from `QuickSync H.264` (or QSV) to **`FFmpeg VAAPI (H.264)`**.
5.  Try recording again.

#### **Solution B: Switch to Software Encoding (x264)**
If VAAPI fails, your CPU is powerful enough (i7-1185G7) to handle software encoding for standard recording tasks.

1.  Go to **Settings** > **Output**.
2.  Change **Video Encoder** to **`x264`**.
3.  This uses your CPU instead of the GPU. It ensures stability but uses more processor power.

### 3. Other Observations
* **Safe Mode:** You launched in Safe Mode because of a previous "unclean shutdown." Once you fix the encoder setting, you should restart OBS normally to restore your third-party plugins (if you use any).
* **Wayland:** You are running on Wayland (`Session Type: wayland`). OBS is correctly using the **PipeWire** capture method (`Screen Capture (PipeWire)`), which is good. The failure is strictly related to *saving* the video (encoding), not *capturing* the screen.

**Next Step:**
Would you like me to suggest specific bitrate or quality settings for the **VAAPI** encoder to get the best quality on your laptop?
