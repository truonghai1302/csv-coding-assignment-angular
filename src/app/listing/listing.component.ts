import { LoadEditTask } from './../details/store/details.actions';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { forkJoin, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BackendService, User } from 'src/app/backend.service';
import { Task } from 'src/app/backend.service';
import { GetTasks, GetUsers, LISTING_STATE_NAME as StateName, ListingState, CompleteTask, NewTask } from 'src/app/listing/store';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListingComponent implements OnInit {
  // tasks = this.backend.tasks();
  @Select(ListingState.tasks) tasks$: Observable<Task[]>;
  @Select(ListingState.users) users$: Observable<User[]>;
  @Select(ListingState.completedTasks) completeTasks$: Observable<Task[]>;
  @Select(ListingState.incompleteTasks) incompleteTasks$: Observable<Task[]>;

  filterUser;

  constructor(
    private backend: BackendService,
    private dialog: MatDialog,
    private store: Store,
    private router: Router,
  ) {    
    // this.tasks$ = this.store.select(state => state[StateName].tasks);
    // this.users$ = this.store.select(state => state[StateName].users);
    // this.completeTasks$ = this.store.select(state => state[StateName].tasks);
    // this.incompleteTasks$ = this.store.select(state => state[StateName].users);
    // this.backend.tasks().pipe(switchMap(tasks => this.store.dispatch(new GetTasks(tasks)))).subscribe();
  }

  ngOnInit(): void {
    forkJoin({tasks: this.backend.tasks(), users: this.backend.users()}).pipe(switchMap(res => forkJoin([
      this.store.dispatch(new GetTasks(res.tasks)),
      this.store.dispatch(new GetUsers(res.users)),
    ]))).subscribe();
  }

  onNewTask() {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const description = result;
        this.backend.newTask({ description })
          .pipe(switchMap(task => this.store.dispatch(new NewTask(task))))
          .subscribe();
      }
      console.log('The dialog was closed');
    });
  }

  onToggleChange(id: number, completed: boolean) {
    this.backend.complete(id, !completed)
      .pipe(switchMap(() => this.store.dispatch(new CompleteTask(id, !completed))))
      .subscribe();
  }

  onUpdateTask(task: Task) {
    this.store.dispatch(new LoadEditTask(task)).subscribe(() => this.router.navigate([task.id]));
  }

}

@Component({
  templateUrl: 'new-task-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
  ) {}

  description = '';

  onNoClick(): void {
    this.dialogRef.close(this.description);
  }
}