# trabalho_final_acn

##1- Build Image
```
docker build -t monitor .
docker login randrades
docker tag monitor randrades/monitor
docker push randrades/monitor

kubectl run monitor --image=randrades/monitor:latest --port=8080 --replicas=2
kubectl get deployments

kubectl expose deployment monitor --type=LoadBalancer --name=monitor
kubectl get services monitor

```