import { Controller, Param, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadContentService } from './upload-content.service';

@Controller('upload-content')
export class UploadContentController {
  constructor(private readonly uploadContentService: UploadContentService) {}

  @Post('excel')
  @UseInterceptors(FileInterceptor('file'))
  uploadExcel(@UploadedFile() file: Express.Multer.File) {
    return this.uploadContentService.uploadAndSave(file);
  }

  @Post('excel-users')
  @UseInterceptors(FileInterceptor('file'))
  uploadExcelUsers(@UploadedFile() file: Express.Multer.File) {
    return this.uploadContentService.uploadAndSaveUser(file);
  }

  @Post('json/:type')
  @UseInterceptors(FilesInterceptor('files', 2)) // максимум 2 файла: [ru, kk]
  uploadTasksJson(@Param('type') type: string, @UploadedFiles() files: Express.Multer.File[]) {
    return this.uploadContentService.uploadTasksByType(files, type);
  }
}
