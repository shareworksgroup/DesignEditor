export const resizeImg = function(MaxWidth, MaxHeight, width, height) {
  let tmpWidth = width;
  let tmpHeight = height;
  if (tmpWidth > 0 && tmpHeight > 0) {
      if (tmpWidth / tmpHeight >= MaxWidth / MaxHeight) {
          return tmpWidth > MaxWidth ? {
              width:  MaxWidth,
              height: (tmpHeight * MaxWidth) / tmpWidth
          }:{
              width:  tmpWidth,
              height: tmpHeight
          };
      } else {
          return tmpHeight > MaxHeight ? {
              height:  MaxHeight,
              width:(tmpWidth * MaxHeight) / tmpHeight
          }:{
              width:  tmpWidth,
              height: tmpHeight
          };
      }
  }
};