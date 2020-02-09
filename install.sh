#!/bin/sh
echo "Installing Typesetter dependecies..." 
sudo apt install nodejs-legacy pandoc wkhtmltopdf
mkdir -p ~/.local/bin > /dev/null
ln -s "`realpath typesetter`" ~/.local/bin/typesetter && chmod +x typesetter
echo "Done!"

