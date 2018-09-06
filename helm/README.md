# Helm

## Fix permission problem

After the deployment of helm with `helm init` the following error message will occur when you try to install a helm chart
`User "system:serviceaccount:kube-system:default" cannot list namespaces in the namespace "default"`
To use helm deploy the service account with `kubectl create -f serviceaccount.yml`
Afterward change the tiller deployment to use this serviceaccount with
```
kubectl patch deploy --namespace kube-system tiller-deploy -p '{"spec":{"template":{"spec":{"serviceAccount":"tiller"}}}}'
```
Then wait until the config changes take affect.
