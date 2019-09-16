/** Entidad Todo */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Todo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ default: false })
    resolved: boolean;

    @Column({ nullable: true })
    image: string;
}

// "src/entity/**/*.ts"
// "dist/entity/*.js"
