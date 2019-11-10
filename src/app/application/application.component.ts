import {Component, OnInit} from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import {DataService} from '../data.service';

import * as moment from 'moment';
import {mergeMap} from 'rxjs/operators';
import {Router} from '@angular/router';


@Component({
    selector: 'app-application',
    templateUrl: './application.component.html',
    styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

    leaveDuration: any;

    dropdownOptions = [];


    taxonomy: number;

    myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd.mm.yyyy',
    };

    startDate: any;
    endDate: any;
    dataModel: any;

    onDateChanged(e, type: string) {
        if (type === 'start') {
            this.startDate = e.epoc;
        } else if (type === 'end') {
            this.endDate = e.epoc;
        }
    }

    reset() {
        this.startDate = '';
        this.endDate = '';
    }

    selectionChanged(e) {
        console.log(e);
        this.taxonomy = e.value.id;
    }

    config = {
        displayKey: 'description',
        search: false,
        height: 'auto',
        placeholder: 'Leave Category',
        customComparator: () => {
        },
        limitTo: this.dropdownOptions.length, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
        moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
        noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
        searchPlaceholder: 'Type of leave', // label thats displayed in search input,
        searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    };

    reqLeave() {

        if (!this.taxonomy || !this.startDate || !this.endDate) {
            console.log(this.taxonomy);
            console.log(this.startDate);
            console.log(this.endDate);
            alert('Please fill out all fields');
            return;
        }

        this.data.addLeave('type', 'all', this.taxonomy, this.startDate, this.endDate)
            .subscribe(data => {
                this.router.navigate(['/history']);
            });
        // addLeave(query = 'type', param = 'all', start: string, end: string, posted: string, user = 1)
    }

    constructor(public data: DataService, private router: Router) {
    }

    ngOnInit() {


        this.data.getLeaveInfo('type', 'categories').subscribe(leaveData => {
            leaveData.terms.forEach((leave, index) => {
                const obj = {
                    id: leave.id,
                    description: leave.name,
                };
                this.dropdownOptions.push(obj);
                console.log(this.dropdownOptions);
            });
        });


    }

}
