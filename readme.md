# Meld Labs

This is the playground for Meld. It is where we experiment.

## Developer Setup

We use Vagrant to manage a custom Ubuntu Trusty 14.04 LTS virtual machine. It
will provide all of the tools you need and still allow you to work in your own
environment/with your own IDE.

### Install Dependencies

You'll need [Git][], [Vagrant][], and [Virtual Box][] installed. On
Ubuntu/Debian run:

    sudo apt-get install git virtualbox vagrant

[Git]: http://www.git-scm.com/downloads
[Vagrant]: https://www.vagrantup.com/downloads.html,
[Virtual Box]: https://www.virtualbox.org/wiki/Downloads

For other systems follow the instructions on the respective websites.

### Clone the Repo:

Clone this repo as you would any other:

    git clone http://github.com/ippo615/meld-labs

### Load the Environment

Once you've cloned the repo you can use vagrant to setup and load the
environment:

    cd meld-labs/
    vagrant up

The first time you run `vagrant up` may take some time because it has to
download and provision a new virtual machine. Subsequent boots will be much
faster.

### Get to Work

The environment provides a browser based IDE called [Cloud9](http://c9.io) on
port 3131. You can access it through either:

 - http://localhost:3131
 - http://127.0.0.1:3131

It also provides a simple http server which can be accessed on port 8080 or:

 - http://localhost:8080
 - http://127.0.0.1:8080

If you need ssh access to the environment simply run `vagrant ssh`.

### Finish Working

When you're done working run `vagrant halt` to power off the virtual machine.

## Organization

The folder structure is:

    ├── environment       - anything relating to the development environment
    │   └── bootstrap.sh  - script to provision virtual machine after 1st boot
    ├── lab               - folder that holds all of the samples
    │   ├── 00-template/  - guide creating an example
    │   ├── 01-example/   - fake example
    │   └── readme.md     - another explaination of something
    ├── readme.md         - the file you are currently reading
    └── vagrantfile       - describes the virtual machine for development

I only use `a-z` (lowercase), `0-9`, `-._` in file and folder names.

Put third parties libraries in a folder called `lib`.
