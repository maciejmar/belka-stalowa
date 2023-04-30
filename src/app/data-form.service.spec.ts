import { TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'
import { Results } from './results';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { DataFormService } from './data-form.service';

describe('DataFormService', () => {
  let service: DataFormService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
      ],
      declarations: [],
      providers:[DataFormService]
    });
    service = TestBed.inject(DataFormService);

  });

  it('should be created', () => {
    const service: DataFormService = TestBed.get(DataFormService);
    expect(service).toBeTruthy();
   });
});
