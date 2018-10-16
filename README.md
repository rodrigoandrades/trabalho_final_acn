# trabalho_final_acn

##1- Build Image
```
criar conta
https://cloud.google.com/billing/docs/how-to/manage-billing-account

create kubernetes cluster
https://cloud.google.com/kubernetes-engine/?hl=pt_BR&_ga=2.220759441.-88863020.1533771832


openssl genrsa -out rsa_private.pem 2048
openssl rsa -in rsa_private.pem -pubout -out rsa_public.pem


criar cluster na AWS
https://docs.aws.amazon.com/pt_br/eks/latest/userguide/create-cluster.html

docker build -t monitor .
docker login randrades
docker tag monitor randrades/monitor
docker push randrades/monitor

kubectl run monitor --image=randrades/monitor:latest --port=8080 --replicas=2
kubectl get deployments

kubectl expose deployment monitor --type=LoadBalancer --name=monitor
kubectl get services monitor


mkdir -p ~/.kube

```