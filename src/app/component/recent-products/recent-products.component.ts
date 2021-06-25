import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-recent-products',
  templateUrl: './recent-products.component.html',
  styleUrls: ['./recent-products.component.scss']
})
export class RecentProductsComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['id', 'category', 'timeStamp'];
  dataSource = new MatTableDataSource<RecentItems>(DATA);
}

export interface RecentItems {
  id: number;
  category: string;
  timeStamp: string;
}

const DATA: RecentItems[] = [
  { id: 1, category: "Electronics", timeStamp: "22-1-2021" },
  { id: 2, category: "Electronics", timeStamp: "22-1-2021" },
  { id: 3, category: "Electronics", timeStamp: "22-1-2021" },
  { id: 1, category: "Electronics", timeStamp: "22-1-2021" },
  { id: 2, category: "Electronics", timeStamp: "22-1-2021" },
  { id: 3, category: "Electronics", timeStamp: "22-1-2021" },
  { id: 1, category: "Electronics", timeStamp: "22-1-2021" },
  { id: 2, category: "Electronics", timeStamp: "22-1-2021" },
  { id: 3, category: "Electronics", timeStamp: "22-1-2021" },
  { id: 3, category: "Electronics", timeStamp: "22-1-2021" },
];
