<?php

namespace App\Classes;


class IncludeView
{
    private $mustache;
    private $fileName;
    private $extension = '.php';
    private $viewDir = ROOT . '/app/views/';

    public function __construct(string $file)
    {
        $this->mustache = new \Mustache_Engine([
            'partials_loader' => new \Mustache_loader_FileSystemLoader(
                $this->viewDir,
                array('extension' => $this->extension)
            )
        ]);
        $this->fileName = $file;
    }

    public function render(array $params)
    {
        $loader = new \Mustache_loader_FileSystemLoader(
            $this->viewDir,
            array('extension' => $this->extension)
        );

        if($this->checkFileExist()) {
            $tmpl = $loader->load($this->fileName);

            echo $this->mustache->render(
                $tmpl,
                $params
            );
        }
    }

    private function checkFileExist()
    {
        return file_exists($this->viewDir . $this->fileName . $this->extension);
    }

}