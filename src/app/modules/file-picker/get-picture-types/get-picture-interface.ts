import FilePickerItem from 'src/app/models/file-picker-item.model';

export default interface GetPicture {
    getPicture(): Promise<FilePickerItem>;
}
