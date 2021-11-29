import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'aws-amplify';

import { Campaign } from '../domain/models';

@Injectable()
export class CampaignService {    
    apiName: string = "campaignApi"
    partyNames: string[] = [
        "Republicans", 
        "Democrats", 
        "Independent", 
        "Liberal"
    ];

    constructor(private http: HttpClient) { }

    getCampaigns() {
        return this.http.get<any>('assets/data/campaigns.json')
      .toPromise()
      .then(res => res.data as any[])
      .then(data => data);  
        //return API.get(this.apiName, `/campaigns`, {})
    }

    saveCampaign(campaign: Campaign){
        return API.post(this.apiName, '/campaigns', {
            body: campaign
          })
    }

    deleteCampaign(campaignId: string, party: string) {
        return API.del(this.apiName, `/campaigns/object/${campaignId}/${party}`, {})
    }
}