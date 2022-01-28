import { DocumentType, getModelForClass } from '@typegoose/typegoose'

export class BaseModel<T> {

    protected document: DocumentType<T>;

    public get id(): string {
        
        if (this.document)
            return this.document._id.toString();
        else throw new Error('Looking for id on non-mapped object on database');
    }

    // private static get model(): ReturnModelType<T> {
    //     return getModelForClass(Mode);
    // }

    public bindDocument() {

    }


    public attachDocument(document: DocumentType<T> | null): T | null {
        const instance: T | null = document as T | null;
        if (instance && document)
            (instance as any).document = document;
        this.afterAttached()
        return instance;
    }

    protected afterAttached() {

    }
}