import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import * as moment from 'moment';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

    leaveCategories = [];
    filteredCategories = [];
    userLeave = [];

    constructor(public data: DataService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {

        this.route.queryParams.subscribe(data => {
            console.log('category update', data);
            this.filteredCategories = [...this.leaveCategories];
            // console.log([...this.leaveCategories]);
            console.log(this.leaveCategories);
        });

        this.data.getLeaveInfo('type', 'categories')
            .subscribe(leaveData => {
                console.log(leaveData);
                leaveData.terms.forEach((leave, index) => {
                    const obj = {
                        id: leave.id,
                        name: leave.name,
                        active: (index) ? false : true
                    };
                    this.leaveCategories.push(obj);
                });

                leaveData.leaveUserList.forEach(leaveItem => {
                    const obj = {
                        name: leaveItem.name,
                        selectedCategory: leaveItem.selectedCategory,
                        startDate: moment(leaveItem.startDate.value).format('LL'),
                        endDate: moment(leaveItem.endDate.value).format('LL'),
                        postedDate: moment().format('LL'),
                        status: 'Pending'
                    };
                    this.userLeave.push(obj);
                });
            });
    }

    test() {
        this.data.getLeaveInfo('type', 'categories').subscribe(data => console.log(data));
    }

    changeActiveTab(id: number) {
        this.leaveCategories.forEach(leave => {
            if (leave.id === id) {
                leave.active = true;
            } else {
                leave.active = false;
            }
        });
    }

}
