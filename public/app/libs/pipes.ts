/**
 * Created by asqwrd on 2/25/2016.
 */
import {Pipe,PipeTransform} from 'angular2/core';


@Pipe({
    name: 'avatarInitial',
})
export class AvatarInitial implements PipeTransform{

    transform(value:string): string {
        if(value){
            return value[0]
        }
    }
}

@Pipe({
    name: 'values',
    pure:false
})
export class ValuesPipe implements PipeTransform {
    transform(value: any, args?: any[]): any[] {
        // create instance vars to store keys and final output
        let keyArr = Object.keys(value),
            dataArr = [];

        // loop through the object,
        // pushing values to the return array
        keyArr.forEach(key => {
            dataArr.push(value[key]);
        });

        // return the resulting array
        return dataArr;
    }
}


@Pipe({
    name: 'nameList',
    pure:false
})
export class NameListPipe implements PipeTransform {
    transform(value: any): any {
        // create instance vars to store keys and final output
        var names = "";
        if(value) {
            value.forEach(function (name, index) {
                if (index == value.length - 1) {
                    names += name.firstname;
                } else {
                    names += name.firstname + ", ";
                }
            });
        }
        if(names.length > 15) {
            names = names.substring(0, 15) + "...";
        }



        return names;
    }
}

