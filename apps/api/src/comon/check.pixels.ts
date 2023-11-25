export const checkPixels = (pixels: any) => {
  let sizes = null;
  if (pixels <= 640) {
    sizes = {
      actual: Math.ceil(pixels),
    };
  }
  if (pixels > 1920 && pixels <= 3840) {
    sizes = {
      actual: Math.ceil(pixels),
      thumbnail: 640,
    };
  }
  if (pixels > 640 && pixels <= 1920) {
    sizes = {
      actual: Math.ceil(pixels),
      thumbnail: 640,
      '2k': 1920,
    };
  }
  if (pixels > 3840) {
    sizes = {
      actual: Math.ceil(pixels),
      thumbnail: 640,
      '2k': 1920,
      '4k': 3840,
    };
  }

  return sizes;
};
