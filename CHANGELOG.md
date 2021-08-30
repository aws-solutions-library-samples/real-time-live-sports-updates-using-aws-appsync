# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2021-08-11
### Changed
- APIKeyExpirationEpoch input parameters is now the date in seconds since Epoch, for AppSync APIKey expiration.
- APIKeyExpirationEpoch default value set to 1640952000, equivalent to 2021-12-31T12:00:00Z
- Setting APIKeyExpirationEpoch to 0 will result in APIKey expiration date 2022-05-31

## [1.0.0] - 2020-07-09
### Added
- First Release 