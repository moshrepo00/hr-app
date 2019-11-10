import {Component, OnInit} from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import {DataService} from '../data.service';


@Component({
    selector: 'app-application',
    templateUrl: './application.component.html',
    styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

    leaveDuration: any;

    dropdownOptions = [{
        id: 1,
        description: 'Vacation'
    }, {
        id: 2,
        description: 'Sick Leave'
    }, {
        id: 3,
        description: 'Weekend OT claim'
    }, {
        id: 4,
        description: 'No Paid Leave'
    }
    ];

    myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };

    startDate: any;
    endDate: any;


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


    constructor(public data: DataService) {
    }

    ngOnInit() {
    }

}
