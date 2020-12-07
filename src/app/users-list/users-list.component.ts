import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfigService } from '../config.service';
import { ExcelExportService } from '../excel-export.service';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})


export class UsersListComponent implements OnInit, AfterViewInit {
  // [x: string]: any;
  displayedColumns: string[] = ['id', 'name', 'email'];
  dataSource: MatTableDataSource<UserData>;
  tableData = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ConfigService, private excelService:ExcelExportService) { }
  ngOnInit(): void {
    this.api.get('users').subscribe(
      res => {
        this.tableData = res['data'];
        console.log(this.tableData);
        this.dataSource = new MatTableDataSource(this.tableData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err =>
        console.log(err)
    )
  }


  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ExportTOExcel() {
    this.excelService.exportAsExcelFile(this.tableData, 'sample');
  }

}

export interface UserData {
  user_id: string;
  user_name: string;
  user_email: string;
}


