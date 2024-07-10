repositories=(
  "https://github.com/fintegrate-practicum/communication.git"
  "https://github.com/fintegrate-practicum/website.git"
  "https://github.com/fintegrate-practicum/orders.git"
  "https://github.com/fintegrate-practicum/inventory.git"
  "https://github.com/fintegrate-practicum/infra.git"
  "https://github.com/fintegrate-practicum/workers.git"
)

parent_dir=$(dirname "$(realpath $0)")

printf "\e[1;32mCloning repositories to %s...\e[0m\n" "$parent_dir"
for repo in "${repositories[@]}"; do
  repo_name=$(echo $repo | sed 's/.*\/\(.*\).git/\1/')
  printf "\e[1;34mCloning %s to %s/%s...\e[0m\n" "$repo" "$parent_dir" "$repo_name"
  git clone $repo $parent_dir/$repo_name
  printf "\e[1;32mCloned %s successfully.\e[0m\n" "$repo_name"
done
