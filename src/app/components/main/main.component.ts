import { DataSource } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { PretestService } from 'src/app/service/pretest.service';
@Component({
  selector: 'c-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public ngDestroyed$ = new Subject();

  displayedColumns: any[] = [];

  dataSource: MatTableDataSource<any>;

  private _unsubscribeAll: Subject<any>;
  constructor(
    private fb: FormBuilder,
    private service: PretestService
  ) {
    this._unsubscribeAll = new Subject();
  }


  ngOnInit(): void {
    this.loadData();
    this.setupTable();
  }
  loadData() {
        this.service.loadData().pipe(takeUntil(this.ngDestroyed$)).subscribe(result => {
            this.dataSource = new MatTableDataSource(result) ;
        });
  }

setupTable() {
  // this.dataSource = new FilesDataSource(this.service);
  this.displayedColumns = ['list'];
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
ngOnDestroy(): void {
  this._unsubscribeAll.next();
  this._unsubscribeAll.complete();
}
}
