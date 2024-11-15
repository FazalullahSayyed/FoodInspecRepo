import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportsComponentComponent } from './reports-component/reports-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { LoginComponent } from './user-login/user-login.component';
import { AuthService } from './auth.service';
import { RegisterComponent } from './register/register.component';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { MatListModule } from '@angular/material/list'; // Import MatListModule

import { FoodInspectorComponent } from './food-inspector/food-inspector.component';
import { SchoolManagementComponent } from './school-management/school-management.component';
import { InspectionFormComponent } from './inspection-form/inspection-form.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomMappingComponent } from './custom-mapping/custom-mapping.component';
import { NewpageComponent } from './newpage/newpage.component';
import { MatRadioModule } from '@angular/material/radio';
import { AdmindashboardcomponentComponent } from './admindashboardcomponent/admindashboardcomponent.component';
import { UserdashboardcomponentComponent } from './userdashboardcomponent/userdashboardcomponent.component';
import { UnannouncedCertificationComponent } from './unannounced-certification/unannounced-certification.component';
import { GeneralComponent } from './general/general.component';
import { QuestionsComponent } from './questions/questions.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { InspectionFormpdfComponent } from './inspection-formpdf/inspection-formpdf.component';
import { SchoolSelectorComponent } from './school-selector-component/school-selector-component.component';
import { InspectorSelectorComponent } from './inspector-selector-component/inspector-selector-component.component';
// Import MatProgressSpinnerModule
const routes: Routes = [
  {path:'', component: AppComponent},
 
];

@NgModule({

  exports: [RouterModule],
  declarations: [
    AppComponent,
    ReportsComponentComponent,
    LoginComponent,
    RegisterComponent,
    FoodInspectorComponent,
    SchoolManagementComponent,
    InspectionFormComponent,
    CustomMappingComponent,
    NewpageComponent,
    AdmindashboardcomponentComponent,
    UserdashboardcomponentComponent,
    UnannouncedCertificationComponent,
    GeneralComponent,
    QuestionsComponent,
    DeliveryComponent,
    InspectionFormpdfComponent,
    SchoolSelectorComponent,
    InspectorSelectorComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    [RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTableModule,
    MatCardModule, // Add MatCardModule here
    MatButtonModule, // Add MatButtonModule here
    MatListModule,  // Add MatListModule here
    MatProgressBarModule,
    MatRadioModule,
    NgxMaterialTimepickerModule,
    MatCheckboxModule
  ]
    
  ],
  
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
