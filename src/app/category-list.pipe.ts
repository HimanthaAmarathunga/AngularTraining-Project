import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'categoryList'
})
export class CategoryListPipe implements PipeTransform{
    transform(mediaItems: any) {
        const categories: any[] = [];
        mediaItems.forEach((mediaItem: { category: any; }) => {
            if (categories.indexOf(mediaItem.category) <= -1) {
                categories.push(mediaItem.category);
            }
        });
        return categories.join(', ');
    }
}