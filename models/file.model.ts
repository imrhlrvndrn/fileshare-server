import mongoose, { Document } from 'mongoose';
const Schema = mongoose.Schema;

const fileSchema = new Schema(
    {
        file_name: { type: String, required: true },
        url: { type: String, required: true },
        size: { type: Number, required: true }, // in megs
        format: { type: String, required: true },
        sender: { type: String },
        receiver: { type: String },
    },
    { timestamps: true }
);

interface IFileSchema extends Document {
    file_name: string;
    url: string;
    size: number; // in megs
    format: string;
    sender?: string;
    receiver?: string;
}

export default mongoose.model<IFileSchema>('File', fileSchema);
