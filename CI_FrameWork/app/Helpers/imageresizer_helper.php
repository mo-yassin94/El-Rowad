<?php





     function resizephoto($src, $filename, $type){

         $new_image = './uploads/images/'.$src.$filename;

         if ($type == 'png') {
             $images_orig = ImageCreateFrompng($new_image);
             $photoX = ImagesX($images_orig);
             $photoY = ImagesY($images_orig);
             $images_fin = ImageCreateTrueColor($photoX, $photoY);
             ImageCopyResampled($images_fin, $images_orig, 0, 0, 0, 0, $photoX+1, $photoY+1, $photoX, $photoY);
             Imagepng($images_fin, $new_image);

         } else {
             $images_orig = ImageCreateFromJPEG($new_image);
             $photoX = ImagesX($images_orig);
             $photoY = ImagesY($images_orig);
             $images_fin = ImageCreateTrueColor($photoX, $photoY);
             ImageCopyResampled($images_fin, $images_orig, 0, 0, 0, 0, $photoX + 1, $photoY + 1, $photoX, $photoY);
             ImageJPEG($images_fin, $new_image);
         }
         ImageDestroy($images_orig);
         ImageDestroy($images_fin);



     }

    function create_thumb($src, $filename, $type, $w, $h){

        $source_image = './uploads/images/'.$src.$filename;;


        $new_image='./uploads/thumbs/images/'.$src.$filename;




        if ($type == 'png') {
            $images_orig = ImageCreateFrompng($source_image);
            $photoX = ImagesX($images_orig);
            $photoY = ImagesY($images_orig);
            $images_fin = ImageCreateTrueColor($w, $h);
            ImageCopyResampled($images_fin, $images_orig, 0, 0, 0, 0, $w + 1, $h + 1, $photoX, $photoY);
            Imagepng($images_fin, $new_image);

        } else {
            $images_orig = ImageCreateFromJPEG($source_image );
            $photoX = ImagesX($images_orig);
            $photoY = ImagesY($images_orig);
            $images_fin = ImageCreateTrueColor($w, $h);
            ImageCopyResampled($images_fin, $images_orig, 0, 0, 0, 0, $w + 1, $h + 1, $photoX, $photoY);
            ImageJPEG($images_fin, $new_image);
        }
        ImageDestroy($images_orig);
        ImageDestroy($images_fin);


    }





