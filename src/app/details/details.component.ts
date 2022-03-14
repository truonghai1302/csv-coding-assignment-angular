import { switchMap } from 'rxjs/operators';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DetailsState, ResetDetailsState, UpdateTask } from 'src/app/details/store';
import { BackendService, Task } from 'src/app/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit, OnDestroy {
  @Select(DetailsState.task) task$: Observable<Task>;

  form: FormGroup;
  
  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private backend: BackendService,
    private router: Router
  ) { 
    this.form = this.formBuilder.group({
      id: [null],
      description: [''],
      completed: [false],
      assigneeId: [null],
    })
  }

  ngOnInit(): void {
    const task = this.store.selectSnapshot(DetailsState.task);
    if(task) {
      const { id, description, assigneeId, completed } = task;
      this.form.patchValue({
        id,
        description,
        assigneeId,
        completed
      })
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ResetDetailsState);
  }

  onSubmit(formValue: Task) {
    const { id, description, assigneeId, completed } = formValue;
    this.backend.update(id, { description, assigneeId, completed })
      .pipe(switchMap((task) => this.store.dispatch(new UpdateTask(task))))
      .subscribe(() => this.router.navigate(['./']));
      
  }

}
