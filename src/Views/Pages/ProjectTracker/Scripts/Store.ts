import { defineStore } from 'pinia'
import { Project } from './Model';
import { UseLS } from '@/Scripts/Functions';

const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
});

export const projectTrackerStore = defineStore('projectTracker', {
    state: () => ({
        Projects: UseLS<Project[]>('projectTrackerStore_Projects', []),
        Selected: null! as string,
    }),
    getters: { },
    actions: { 
        GetProject: function(guid: string, project?: Project): Project| null {
            if (project?.Id === guid) return project;
            return (project ? project.Items : this.Projects).reduce<Project | null>((a,b) => a || this.GetProject(guid, b), null);
        },
        GetParent: function(guid: string, project?: Project): Project | null {
            const items = project?.Items || this.Projects;
            if (items.some(x => x.Id == guid)) return project || null;
            return items.reduce<Project | null>((a,b) => a || this.GetParent(guid, b), null);
        },
        SelectParent: function() {
            this.Selected = this.GetParent(this.Selected || '')?.Id!;
        },
        AddChild: function() {
            if (this.Selected) {
                const project = this.GetProject(this.Selected);
                project?.Items.push(Project.New());
            } else {
                this.Projects.push(Project.New());
            }
        },
        GetPrice: function(project: Project): number {
            if (project.Items.length) {
                return project.Items.reduce((a,b) => a + +this.GetPrice(b), 0);
            }
            return project.Price || 0;
        },
        Dollars: function(project: Project): string {
            return currency.format(this.GetPrice(project) || 0);
        },
    },
});