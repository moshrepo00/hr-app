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
    category: any;

    constructor(public data: DataService, private route: ActivatedRoute, private router: Router) {
    }

    someaction() {

    }

    ngOnInit() {

        this.userLeave = [];
        this.filteredLeave = [];

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
                        startDate: moment(leaveItem.startDate[0].value).format('LL'),
                        endDate: moment(leaveItem.endDate[0].value).format('LL'),
                        postedDate: moment().format('LL'),
                        status: 'Pending',
                        targetId: leaveItem.target_id
                    };
                    this.userLeave.push(obj);
                });
                return this.route.queryParams;
            })
        ).subscribe((queryParams) => {
            if (queryParams.category) {
                this.category = queryParams.category;
                console.log(this.leaveCategories);
                const category = queryParams.category;
                if (category.toLowerCase() !== 'all') {
                    this.leaveCategories.forEach(item => {
                        if (item.name === category) {
                            item.active = true;
                        } else {
                            item.active = false;
                        }
                    });
                    this.filteredLeave = this.userLeave.filter(item => item.selectedCategory === category);
                    console.log(this.userLeave);
                    console.log(this.filteredLeave);
                } else {
                    this.leaveCategories.forEach(item => {
                        if (item.name !== 'all') {
                            item.active = false;
                        }
                    });
                    const allObj = this.leaveCategories.find(item => item.name === 'All');
                    allObj.active = true;
                    this.filteredLeave = [...this.userLeave];
                }
            } else {
                this.router.navigate(['.'], {relativeTo: this.route, queryParams: {category: 'All'}});
            }
        });
    }


    updateQueryParams() {

    }

    delete(pid) {
        console.log(pid);
        const c = confirm('Are you sure you would like to delete this application?');
        if (c) {
            this.data.deleteLeave(pid).subscribe((leaveData: any) => {
                console.log(leaveData);
                let i = this.userLeave.findIndex(item => item.targetId == pid);
                this.userLeave.splice(i, 1);
                i = this.filteredLeave.findIndex(item => item.targetId == pid);
                this.filteredLeave.splice(i, 1);
            });
        }
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
