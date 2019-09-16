/**
 * Este modelo se usa en file-picker para los datos de la imagen seleccionada
 */

export default class FilePickerItem {
    public uri: string;
    public name: string;

    constructor(uri: string, name: string) {
        this.uri = uri;
        this.name = name;
    }
}
