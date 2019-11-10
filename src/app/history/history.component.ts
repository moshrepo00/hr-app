import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import * as moment from 'moment';
import {ActivatedRoute, Router} from '@angular/router';
import {mergeMap} from 'rxjs/operators';
import {observable, of} from 'rxjs';


@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

    leaveCategories = [];
    filteredCategories = [];
    userLeave = [];
    filteredLeave = [];

    constructor(public data: DataService, private route: ActivatedRoute, private router: Router) {
    }

    someaction() {

    }

    ngOnInit() {

        this.data.getLeaveInfo('type', 'categories').pipe(
            mergeMap(leaveData => {
                console.log(leaveData);
                this.leaveCategories.push({
                    id: 0,
                    name: 'All',
                });
                leaveData.terms.forEach((leave, index) => {
                    const obj = {
                        id: leave.id,
                        name: leave.name,
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
                return this.route.queryParams;
            })
        ).subscribe((queryParams) => {
            if (queryParams.category) {
                console.log(this.leaveCategories);
                const category = queryParams.category;
                if (category !== 'All') {
                    this.leaveCategories.forEach(item => {
                        if (item.name === category) {
                            item.active = true;
                        }
                    });
                    this.filteredLeave = this.userLeave.filter(item => item.selectedCategory === category);
                    console.log(this.userLeave);
                    console.log(this.filteredLeave);
                } else {
                    const allObj = this.leaveCategories.find(item => item.name === 'All');
                    allObj.active = true;
                    this.filteredLeave = [...this.userLeave];
                }
            } else {
                this.router.navigate(['.'], {relativeTo: this.route, queryParams: {category: 'all'}});
            }
        });
    }


    updateQueryParams() {

    }

    changeActiveTab(id: number, name: string) {
        this.leaveCategories.forEach(leave => {
            if (leave.id === id) {
                leave.active = true;
            } else {
                leave.active = false;
            }
        });

        this.router.navigate(['.'], {relativeTo: this.route, queryParams: {category: name}});
    }

}
