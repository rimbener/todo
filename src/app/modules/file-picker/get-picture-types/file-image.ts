/**
 * Esta clase abre el diálogo de archivos local y devuelve una imagen
 */
import { Subject } from 'rxjs';

import GetPicture from './get-picture-interface';
import FilePickerItem from 'src/app/models/file-picker-item.model';

export default class FileImage implements GetPicture {
    private inputElement: HTMLElement;

    private fileLoaded: Subject<FilePickerItem> = new Subject();

    /**
     * Abre el diálogo de archivos local
     * devuelve una promesa cuando la imagen se termino de cargar al navegador
     */
    public async getPicture(): Promise<FilePickerItem> {
        this.openDialog();
        return new Promise((resolve) => this.fileLoaded.subscribe(file => resolve(file)));
    }

    /**
     * Para abrir el diálogo de fotos, crea un input de tipo file y ejecuta su método click
     */
    private openDialog() {
        if (!this.inputElement) {
            this.createInputElement();
        }
        this.inputElement.click();
    }

    /**
     *  Creo el input file y le pongo un listener al evento change en la función onChange
     */
    private createInputElement() {
        this.inputElement = document.createElement('INPUT');
        this.inputElement.setAttribute('type', 'file');
        this.inputElement.setAttribute('accept', 'image/*');
        this.inputElement.addEventListener('change', this.onChange.bind(this));
    }

    /**
     * Este método se ejecuta cuando el usuario elige un archivo
     * y lo lee con FileReader
     * cuando termina de leerlo actualiza el Subject fileLoaded
     */
    private onChange(ev: { path: { files: any[]; }[]; }) {
        const file = ev.path[0].files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => this.fileLoaded.next(new FilePickerItem(reader.result as string, file.name));
        }
    }
}
