declare module "smartcrop" {
    export interface Crop {
      x: number;
      y: number;
      width: number;
      height: number;
    }
  
    export interface SmartCropOptions {
      width: number;
      height: number;
    }
  
    export function crop(image: HTMLImageElement, options: SmartCropOptions): Promise<{ topCrop: Crop }>;
  }