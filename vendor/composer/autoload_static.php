<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInite14da61ad0eb5c82552b42daee887f4c
{
    public static $prefixLengthsPsr4 = array (
        'F' => 
        array (
            'Firebase\\JWT\\' => 13,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Firebase\\JWT\\' => 
        array (
            0 => __DIR__ . '/..' . '/firebase/php-jwt/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInite14da61ad0eb5c82552b42daee887f4c::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInite14da61ad0eb5c82552b42daee887f4c::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInite14da61ad0eb5c82552b42daee887f4c::$classMap;

        }, null, ClassLoader::class);
    }
}