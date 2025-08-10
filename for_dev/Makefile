KEYCLOAK_IMAGE ?= quay.io/keycloak/keycloak:26.3.2
KEYCLOAK_CONTAINER ?= keycloak-dev
KEYCLOAK_PORT ?= 8098
REALM ?= myrealm
EXPORTS_DIR ?= $(CURDIR)/exports
IMPORT_DIR ?= $(CURDIR)/data/import
TEMPLATE ?= $(CURDIR)/realm-template.json
PROVIDERS ?= $(CURDIR)/providers.json
MERGE_SCRIPT ?= $(CURDIR)/merge.jq
REALM_JSON ?= $(IMPORT_DIR)/$(REALM)-realm.json

.PHONY: help
help:
	@echo "Targets:"
	@echo "  make gen         - generate $(REALM_JSON) from template and providers.json"
	@echo "  make up          - run Keycloak container on port $(KEYCLOAK_PORT) with import"
	@echo "  make logs        - tail Keycloak logs"
	@echo "  make down        - stop and remove container"

$(IMPORT_DIR):
	mkdir -p $(IMPORT_DIR)

# Merge providers into template using jq; expects providers.json next to template
.PHONY: gen
gen: $(IMPORT_DIR)
	@test -f $(TEMPLATE) || (echo "Missing $(TEMPLATE)" && exit 1)
	@test -f $(PROVIDERS) || (echo "Missing $(PROVIDERS). Copy providers.example.json to providers.json and fill values." && exit 1)
	@test -f $(MERGE_SCRIPT) || (echo "Missing $(MERGE_SCRIPT)" && exit 1)
	jq -s -f $(MERGE_SCRIPT) $(TEMPLATE) $(PROVIDERS) > $(REALM_JSON)
	@echo "Generated: $(REALM_JSON)"

.PHONY: up
up: gen
	docker rm -f $(KEYCLOAK_CONTAINER)-test >/dev/null 2>&1 || true
	docker run --name $(KEYCLOAK_CONTAINER)-test -p $(KEYCLOAK_PORT):8080 \
	  -v $(IMPORT_DIR):/opt/keycloak/data/import \
	  -e KEYCLOAK_ADMIN=admin \
	  -e KEYCLOAK_ADMIN_PASSWORD=admin \
	  $(KEYCLOAK_IMAGE) \
	  start-dev --import-realm

.PHONY: logs
logs:
	docker logs -f $(KEYCLOAK_CONTAINER)-test

.PHONY: down
down:
	docker rm -f $(KEYCLOAK_CONTAINER)-test || true 