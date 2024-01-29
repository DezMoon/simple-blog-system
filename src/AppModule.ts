import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from '@apollo/client/link/http';
import { InMemoryCache } from '@apollo/client/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalErrorHandler } from './global-error-handler.service';
import { AuthGuard } from './app/services/auth.guard';
import { LoginComponent } from './app/login/login.component';
import { UserProfileComponent } from './app/user-profile/user-profile.component';
import { HomeComponent } from './app/home/home.component';

const uri = 'http://localhost:3000/graphql'; // Replace with your GraphQL endpoint

// Define protected routes
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'posts',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./app/posts/posts.module').then((m) => m.PostsModule),
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: UserProfileComponent,
  },
  { path: 'login', component: LoginComponent },
  // ... other routes
];

export function createApollo(httpLink: HttpLink) {
  return {
    cache: new InMemoryCache(),
    link: new HttpLink({ uri }),
  };
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    RouterModule.forRoot(routes), // Configure routing with protected routes
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
    GlobalErrorHandler, // Separate provider for GlobalErrorHandler
    AuthGuard,
  ],
})
export class AppModule {}
