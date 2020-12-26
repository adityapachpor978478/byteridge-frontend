import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'audit.component.html' })
export class AuditComponent implements OnInit {
    currentUser: User;
    users = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    columnDefs = [
        {headerName: "Role", field: "role", sortable: true, filter: true},
        {headerName: "Username", field: "username", sortable: true, filter: true},
        {headerName: "Login Time", field: "loginTime", sortable: true, filter: true},
        {headerName: "Logout Time", field: "logoutTime", sortable: true, filter: true},
        {headerName: "Client IP", field: "clientIp", sortable: true, filter: true}
    ];

    ngOnInit() {
        this.loadAuditData();
    }

    private loadAuditData() {
        this.userService.getAudit()
            .pipe(first())
            .subscribe(users => this.users = users);
    }
}