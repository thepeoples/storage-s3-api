# Storage API

Base service for using KV data using S3.

## TODO

* Abstract object storage backend for S3 services (AWS, MinIO, Linode, etc)
  * S3 request pass-through for "native" S3 integrations
  * Client-side encryption keys managed by Vault before S3 upload ensures data privacy
* S3 object write locking strategy
* Object metadata to be stored in backend-agnostic indexer
* Cache and query parser for indexer for fast data queries
* Auth with OIDC client