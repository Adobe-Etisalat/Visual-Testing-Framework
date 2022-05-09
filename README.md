# migration-rampup-qa
This repo is used by the ramp up team to visually compare live and migrated pages

Here you can find code and configuration required to validate the pages visually using cypress and percy.

Tools used:

1.npm
2.cypress
3.percy
4.Cypress dashboard
5.Mocha
6.Github actions

Pre-requisite:
Test data: The url's of pages needs to be specified in json file under the path \cypress\fixtures.
Test scripts: The test script to open the page in the desired state is developed and pushed to GIT.

Example : \cypress\fixtures\whitelabel.json

In the above example urls of homepage and 2 product pages are specified to be validate visually. The productpages are specified as array.

To visually validate the paage sample script as in file \cypress\integration\whitelabel.js needs to be specified. The beforeeach block needs to have the coide to read the fixtures. Separate test needs to be written for homepage and productpage. The skeletal structure remains same but the url changes

Steps:
1.Get the percy token for your project from Percy Dashboard
2.Clone the repo to you local
3.Set the project key using export PERCY_TOKEN="VALUE" or SET PERCY_TOKEN="VALUE"
4.Execute the percy-cypress-get-prod-screenshot.yml to capture screenshot of the live page.
5.On code deployment percy-cypress-get-prod-screenshot.yml is called which would capture the screnshot of the migrated pages and compare against the live site.


Below is the folder structure and its purpose:

![image](https://user-images.githubusercontent.com/7846128/143275474-da00bc48-ee81-468e-b20a-cd6faedde961.png)


![image](https://user-images.githubusercontent.com/7846128/143275517-b047f155-255e-4938-a516-4e253345c73c.png)


![image](https://user-images.githubusercontent.com/7846128/143275564-1d41e821-d093-4ea6-9c28-35b743d1bdb1.png)


workflows: Has the required workflows which are used for CI/CD

brand-to-run.json : This would contain all the brands which needs to be considered for the lighthouse scan.

example: {"brand": ["whitelabel-en","magnum-en","closeup-en"]}

percy-cypress-get-prod-screenshot.yml: This workflow is triggered manually to capture the screenshot of the live pages. 

percy-cypress-compare-prod.yml: The workflow which is called as part of webhook which would validate the pages visually in percy once deployment is completed.

This workflow can be triggered in one of the following ways:

1.FE repo
2.AEM repo


In all the cases the Program id and Pipline id is required to determine the instance against which the visual use tests are to be executed. In the case of FE and AEM repo, the calling workflow needs to be pass the program id and pipeline id to webhook.yml which inturn calls the visual-ci-cd.yml. In the case of manual trigger user should select the appropriate program id and pipeline id to triiger the visual-ci-cd workflow against specified instance.

Visual tests gets triggered via AEM or FE repo, this would start only after the deployment to specified instance of AEM.

visual-ci-cd-compare-prod.yml: Can be used by the ramp up qa to trigger the visual validation manually.

In all cases (CI/CD or Manual trigger) once the execution is done, the percy would capture the screenshot. This later needs to be reviewd manually.

![image](https://user-images.githubusercontent.com/7846128/143275719-e8eab1f0-360e-4dfc-a2fb-8f1ea9b75054.png)


PERCY Dashboard: 

![image](https://user-images.githubusercontent.com/7846128/143275906-ce98897b-34af-42a7-b25e-0e88fd1e98b2.png)


cypress: Has cypress specific files and folders fixtures: all the test data are passed via fixtures as part of json file. integration: all the .js files which are test files are placed under this folder. screenshots: all the execution screenshots are captured here videos: all the videos of the execution are captured here

percy.yml: Has percy specific configuration. This needs to be updated as needed. https://docs.percy.io/docs/cli-config

cypress.json: Used for cypress specific configuration.

package.json: Used to manage the dependencies.

Once the job is completed the slack user group configured is notified on the status. image
![image](https://user-images.githubusercontent.com/7846128/143240549-fd4ad370-41a1-4a8f-b103-622a0e7cbf91.png)

Note:

1.Add additional envrionment folder under workflows folder when needed
2.As and when more brands are to be onboarded, create brand specific folder in dev1,dev2,dev3,stage and other folders, create the test data under brand folders with.json under /fixtures, create brand specific folders with .js files under /integration folder.
3.All the migrated tests and test data needs to be under folder migrated. All the live site tests and test data should be place under folder prod.
4. The number of pages that needs to be validate should be split across 4 fixtures so that they are executed on 4 containers in parallel

![image](https://user-images.githubusercontent.com/7846128/143276036-84239d67-e7ba-4b70-88a9-5837e7987afd.png)

