import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DdrButton, DdrButtonComponent, DdrButtonMultipleComponent, DdrThemeService, DdrToastService, DdrToggleComponent, DdrTranslatePipe, DdrTranslateService } from 'ddr-ng';

@Component({
  selector: 'app-root',
  imports: [
    DdrButtonMultipleComponent,
    DdrButtonComponent,
    DdrTranslatePipe,
    DdrToggleComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [
    DdrToastService,
    DdrThemeService
  ]
})
export class App {
  protected readonly title = signal('example-ddr-ng');

  private ddrToastService: DdrToastService = inject(DdrToastService);
  private ddrTranslateService: DdrTranslateService = inject(DdrTranslateService);
   private themeService: DdrThemeService = inject(DdrThemeService);

  public buttons: DdrButton[] = [
    {
      text: 'button.multiple.1',
      icon: 'bi bi-check',
      value: 'BUTTON_1'
    },
    {
      text: 'button.multiple.2',
      icon: 'bi bi-x',
      value: 'BUTTON_2'
    },
    {
      text: 'button.multiple.3',
      icon: 'bi bi-trash',
      value: 'BUTTON_3'
    }
  ];

  changeToSpanish() {
    this.ddrTranslateService.getData('/i18n/', 'es')
  }

  changeToEnglish() {
    this.ddrTranslateService.getData('/i18n/', 'en')
  }

  clickButton(button: DdrButton) {
    this.ddrToastService.addSuccessMessage(
      this.ddrTranslateService.getTranslate('success'),
      JSON.stringify(button)
    )
  }

  toggleValue(value: boolean){
    if(value){
      this.themeService.setTheme('ddr-dark');
    }else{
      this.themeService.setTheme('ddr-blue');
    }
  }
}
