import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponentComponent } from './reports-component/reports-component.component';

import { LoginuserService } from './loginuser.service';
import { LoginComponent } from './user-login/user-login.component';
import { FoodInspectorComponent } from './food-inspector/food-inspector.component';
import { SchoolManagementComponent } from './school-management/school-management.component';
import { InspectionFormComponent } from './inspection-form/inspection-form.component';
import { CustomMappingComponent } from './custom-mapping/custom-mapping.component';

import { AdmindashboardcomponentComponent } from './admindashboardcomponent/admindashboardcomponent.component';
import { UserdashboardcomponentComponent } from './userdashboardcomponent/userdashboardcomponent.component';
import { UnannouncedCertificationComponent } from './unannounced-certification/unannounced-certification.component';
import { GeneralComponent } from './general/general.component';
import { QuestionsComponent } from './questions/questions.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { InspectionFormpdfComponent } from './inspection-formpdf/inspection-formpdf.component';
const routes: Routes = [
  {path:"login",component:LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: "reports", component: ReportsComponentComponent },
 {path:"inspector", component:SchoolManagementComponent},
 {path:"mappings",component:CustomMappingComponent},
  { path: 'register-inspector', component: FoodInspectorComponent },
  { path: 'add-inspection', component: InspectionFormComponent },
    // User routes (protected by AuthGuard)
    // ... other user routes
  {path:"user-dashboard",component:UserdashboardcomponentComponent},
    // Admin routes (protected by AuthGuard and AdminGuard)
    { path: 'admin-dashboard', component: AdmindashboardcomponentComponent},   // ... other admin routes
  {path:'UnannouncedCertificationComponent',component:UnannouncedCertificationComponent},
  {path:'general',component:GeneralComponent},
  {path:'questions',component:QuestionsComponent},
  {path:'delivery',component:DeliveryComponent},
  {path:'final-summary',component:InspectionFormpdfComponent},
    // Default route
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    // Wildcard route for a 404 page
    { path: '**', redirectTo: '/login' },
  ];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
