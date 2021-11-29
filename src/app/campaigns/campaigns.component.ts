import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Campaign } from '../domain/models';
import { CampaignService } from '../services/campaignService';
import { v4 as uuid } from 'uuid';

@Component({
    selector: 'app-campaigns',
    templateUrl: './campaigns.component.html',
    styleUrls: ['./campaigns.component.css'],
    providers: [ConfirmationService,MessageService,CampaignService]
})
export class CampaignsComponent implements OnInit {

    campaignDialog: boolean;

    campaigns: Campaign[];

    campaign: Campaign;

    selectedCampaigns: Campaign[];

    submitted: boolean;

    constructor(private campaignService: CampaignService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.campaignService.getCampaigns().then(data => this.campaigns = data);
    }
    

    openNew() {
        this.campaign = {};
        this.submitted = false;
        this.campaignDialog = true;
    }

    deleteSelectedCampaigns() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected campaigns?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.campaigns = this.campaigns.filter(val => !this.selectedCampaigns.includes(val));
                // this.selectedCampaigns.forEach(element => {
                //     this.campaignService.deleteCampaign(element.id, element.party)
                // }); 
                this.selectedCampaigns = null;
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Campaigns Deleted', life: 3000});
            }
        });
    }

    editCampaign(campaign: Campaign) {
        this.campaign = {...campaign};
        this.campaignDialog = true;
    }

    deleteCampaign(campaign: Campaign) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + campaign.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.campaigns = this.campaigns.filter(val => val.id !== campaign.id);
                this.campaign = {};
                //this.campaignService.deleteCampaign(campaign.id, campaign.party)
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
            }
        });
    }

    hideDialog() {
        this.campaignDialog = false;
        this.submitted = false;
    }

    saveCampaign1() {
        this.submitted = true;

        if (this.campaign.name.trim()) {
            if (this.campaign.id) {
                this.campaigns[this.findIndexById(this.campaign.id)] = this.campaign;                
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Campaign Updated', life: 3000});
            }
            else {
                this.campaign.id = uuid();
                this.campaigns.push(this.campaign);
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Campaign Created', life: 3000});
            }

            this.campaigns = [...this.campaigns];
            this.campaignDialog = false;
            this.campaign = {};
            }
    }
    
    // saveCampaign() {
    //     this.submitted = true;

    //     if (this.campaign.name.trim()) {
    //         if (this.campaign.id) {
    //             this.campaignService.saveCampaign(this.campaign).then(data => {
    //                 this.campaigns[this.findIndexById(this.campaign.id)] = this.campaign;                             
    //                 this.messageService.add({severity:'success', summary: 'Successful', detail: 'Campaign Updated', life: 3000});
    //             }).catch(err => {
    //                 console.log(err);
    //               });                
    //         }
    //         else {
    //             this.campaign.id = uuid();
    //             this.campaigns.push(this.campaign);
    //             this.campaignService.saveCampaign(this.campaign).then(data => {                                        
    //                 this.messageService.add({severity:'success', summary: 'Successful', detail: 'Campaign Created', life: 3000});
    //             }).catch(err => {
    //                 this.campaigns.pop();
    //                 console.log(err);
    //               });;                
    //         }
    //         this.campaignDialog = false;
    //         this.campaign = {};
    //     }
    // }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.campaigns.length; i++) {
            if (this.campaigns[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }    
}
