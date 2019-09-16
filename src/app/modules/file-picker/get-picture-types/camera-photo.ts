/**
 * Esta clase levanta la cámara de capacitor y devuelve una imagen
 */
import { Camera, CameraResultType } from '@capacitor/core';

import GetPicture from './get-picture-interface';
import FilePickerItem from 'src/app/models/file-picker-item.model';

export default class CameraPhoto implements GetPicture {
    public async getPicture(): Promise<FilePickerItem> {
        try {
            const image = await Camera.getPhoto({
                quality: 75,
                allowEditing: true,
                resultType: CameraResultType.DataUrl
            });
            return new FilePickerItem(image.dataUrl, 'photo.png');
        } catch (error) {
            if (error !== 'User cancelled photos app') {
                console.log(error);
            }
        }
    }
}
