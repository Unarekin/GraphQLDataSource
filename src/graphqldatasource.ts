import { CollectionViewer, DataSource } from '@angular/cdk/collections';
// import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, startWith } from 'rxjs/operators'
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { GraphQLDataSourceSettings } from './';
const fetch = require('node-fetch');


/**
 * Data Source for Angular Material's data-table, allowing for remote-fetching of GraphQL data with server-side pagination, sorting, and filtering.
 * @implements {DataSource<T>}
 */
export class GraphQLDataSource<T> implements DataSource<T> {
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private dataSubject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  private countSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  /** Observable to track whether or not the data source is loading. */
  public Loading: Observable<boolean> = this.loadingSubject.asObservable();
  /** Observable that emits total document count, for pagination. */
  public Count: Observable<number> = this.countSubject.asObservable();

  private settings: GraphQLDataSourceSettings<T> = null;

  /**
   * Create a GraphQLDataSource
   * @param {GraphQLDataSourceSettings} settings 
   */
  constructor(settings: GraphQLDataSourceSettings<T>) {
    this.settings = settings;
    // Compile to a DocumentNode if it's not already.
    if (typeof settings.query === "string")
      this.settings.query = gql(<string>this.settings.query);
  }

  /**
   * Connects to our data source
   * @param {CollectionViewer} collectionViewer 
   * @returns {Observable}
   */
  connect(collectionViewer: CollectionViewer): Observable<T[]> { return this.dataSubject.asObservable(); }

  /**
   * Disconnects
   * @param {CollectionViewer} collectionViewer 
   */
  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }


  /**
   * 
   * @async
   * @param {any} params 
   */
  public async LoadData(params: any = null) {
    let res = await fetch(this.settings.server, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: this.settings.query })
    });

    console.log("Results: ", res);

  }

}