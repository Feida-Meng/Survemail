function localtunnel {
  lt -s efuti12re56gfhio5367 --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done
