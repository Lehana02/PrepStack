import { PDFDocument } from 'pdf-lib';

const compressPDF = async (fileBuffer) => {
  try {
    const pdfDoc = await PDFDocument.load(fileBuffer);

    const compressedPdfBytes = await pdfDoc.save({
      useObjectStreams: true
    });

    return Buffer.from(compressedPdfBytes);

  } catch (error) {
    console.error("Compression error:", error);
    throw error;
  }
};

export default compressPDF;