#!/bin/bash
#
# This assumes all of the OS-level configuration has been completed and git repo has already been cloned
#
# This script should be run from the repo's deployment directory
# cd deployment
# ./build-s3-dist.sh source-bucket-base-name solution-name version-code
#
# Paramenters:
#  - source-bucket-base-name: Name for the S3 bucket location where the template will source the Lambda
#    code from. The template will append '-[region_name]' to this bucket name.
#    For example: ./build-s3-dist.sh solutions my-solution v1.0.0
#    The template will then expect the source code to be located in the solutions-[region_name] bucket
#
#  - solution-name: name of the solution for consistency
#
#  - version-code: version of the package

# Check to see if input has been provided:
if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]; then
    echo "Please provide the base source bucket name, trademark approved solution name and version where the lambda code will eventually reside."
    echo "For example: ./build-s3-dist.sh solutions trademarked-solution-name v1.0.0"
    exit 1
fi

# Get reference for all important folders
template_dir="$PWD"
template_dist_dir="$template_dir/global-s3-assets"
build_dist_dir="$template_dir/regional-s3-assets"
source_dir="$template_dir/../source"

echo "------------------------------------------------------------------------------"
echo "[Init] Clean old dist, node_modules and bower_components folders"
echo "------------------------------------------------------------------------------"
echo "rm -rf $template_dist_dir"
rm -rf $template_dist_dir
echo "mkdir -p $template_dist_dir"
mkdir -p $template_dist_dir
echo "rm -rf $build_dist_dir"
rm -rf $build_dist_dir
echo "mkdir -p $build_dist_dir"
mkdir -p $build_dist_dir

echo "------------------------------------------------------------------------------"
echo "[Packing] Templates"
echo "------------------------------------------------------------------------------"
echo "cp $template_dir/*.template $template_dist_dir/"
cp $template_dir/*.template $template_dist_dir/
echo "copy yaml templates and rename"
cp $template_dir/*.yaml $template_dist_dir/
cd $template_dist_dir
# Rename all *.yaml to *.template
for f in *.yaml; do 
    mv -- "$f" "${f%.yaml}.template"
done

cd ..
echo "Updating code source bucket in template with $1"
replace="s/%%BUCKET_NAME%%/$1/g"
echo "sed -i '' -e $replace $template_dist_dir/*.template"
sed -i '' -e $replace $template_dist_dir/*.template
replace="s/%%SOLUTION_NAME%%/$2/g"
echo "sed -i '' -e $replace $template_dist_dir/*.template"
sed -i '' -e $replace $template_dist_dir/*.template
replace="s/%%VERSION%%/$3/g"
echo "sed -i '' -e $replace $template_dist_dir/*.template"
sed -i '' -e $replace $template_dist_dir/*.template

echo "------------------------------------------------------------------------------"
echo "Updating GraphQL Schema in dist folder"
echo "------------------------------------------------------------------------------"
cd $source_dir/api
cp ./schema.graphql $build_dist_dir/schema.graphql

echo "------------------------------------------------------------------------------"
echo "Updating Resolvers in dist folder"
echo "------------------------------------------------------------------------------"
cd $source_dir/api/resolvers
mkdir -p $build_dist_dir/resolvers
cp ./* $build_dist_dir/resolvers

echo "------------------------------------------------------------------------------"
echo "[Rebuild] Preprocess Function"
echo "------------------------------------------------------------------------------"
cd $source_dir/functions/preprocess-function
npm run build
cp ./dist/preprocess-function.zip $build_dist_dir/preprocess-function.zip

echo "------------------------------------------------------------------------------"
echo "[Rebuild] Ingestion Function"
echo "------------------------------------------------------------------------------"
cd $source_dir/functions/ingestion-function
npm run build
cp ./dist/ingestion-function.zip $build_dist_dir/ingestion-function.zip

echo "------------------------------------------------------------------------------"
echo "[Rebuild] Ingestion Scheduler Function"
echo "------------------------------------------------------------------------------"
cd $source_dir/functions/scheduler-function
npm run build
cp ./dist/scheduler-function.zip $build_dist_dir/scheduler-function.zip

echo "------------------------------------------------------------------------------"
echo "[Rebuild] GameSimulator Scheduler Function"
echo "------------------------------------------------------------------------------"
cd $source_dir/functions/gamesimulator-scheduler-function
npm run build
cp ./dist/gamesimulator-scheduler-function.zip $build_dist_dir/gamesimulator-scheduler-function.zip

echo "------------------------------------------------------------------------------"
echo "[Rebuild] GameSimulator Function"
echo "------------------------------------------------------------------------------"
cd $source_dir/functions/gamesimulator-function
npm run build
cp ./dist/gamesimulator-function.zip $build_dist_dir/gamesimulator-function.zip

echo "------------------------------------------------------------------------------"
echo "[Rebuild] GameSimulator WebApp"
echo "------------------------------------------------------------------------------"
cd $source_dir/webapp
npm install
npm run build
mkdir -p $build_dist_dir/webapp
cp -rf ./build/* $build_dist_dir/webapp
rm -rf ./build

echo "------------------------------------------------------------------------------"
echo "[Rebuild] GameSimulator Init Function"
echo "------------------------------------------------------------------------------"
cd $source_dir/functions/gamesimulator-init-function
rm websiteFiles.txt
du -a $build_dist_dir/webapp > websiteFiles.txt
npm run build
cp ./dist/gamesimulator-init-function.zip $build_dist_dir/gamesimulator-init-function.zip

echo "------------------------------------------------------------------------------"
echo "[Rebuild] GameUpdates Notification Function"
echo "------------------------------------------------------------------------------"
cd $source_dir/functions/gameupdates-notifications-function
npm run build
cp ./dist/gameupdates-notifications-function.zip $build_dist_dir/gameupdates-notifications-function.zip

echo "------------------------------------------------------------------------------"
echo "[Rebuild] GameUpdates Pinpoint Cleansing Function"
echo "------------------------------------------------------------------------------"
cd $source_dir/functions/gameupdates-pinpoint-cleansing-function
npm run build
cp ./dist/gameupdates-pinpoint-cleansing-function.zip $build_dist_dir/gameupdates-pinpoint-cleansing-function.zip