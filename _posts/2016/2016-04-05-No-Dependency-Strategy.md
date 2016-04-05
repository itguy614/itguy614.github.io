---
layout: post
title: NoDependencyStrategy for Rocketeer
categories: ['development']
---

I have been using [Rocketeer](http://rocketeer.autopergamene.eu/#/docs/rocketeer/README) for deployments into our web cluster.  So far this has worked out to be a great tool and I have not run into too much of an issue, until I wanted to deploy a static Jekyll site and the NPM build was taking forever.  And by forever we are talking in excess of 20 minutes.

Since we are deploying the prebuilt Jekyll, I basically need no dependency installation.  By default Rocketeer will use the Polygot strategy which will take care of everything, which is exactly what I don't want.  My first attempt was to just set that to a null value.  That resulted in a crash and deployment not succeeding.  My solution was to create a dummy strategy which does nothing.

Create the file .rocketeer/strategies/NoDependencyStrategy.php

```php
<?php
namespace GoHclTech;

use \Rocketeer\Abstracts\Strategies\AbstractDependenciesStrategy;
use Rocketeer\Interfaces\Strategies\DependenciesStrategyInterface;

class NoDependencyStrategy extends AbstractDependenciesStrategy  implements DependenciesStrategyInterface
{
    protected $description = 'No dependencies';

    public function install()
    {
        return $this->description;
    }

    public function update()
    {
        return $this->install();
    }
}
?>
```

Update your strategies.php file to use this new class.

```
'dependencies' => 'GoHclTech\NoDependencyStrategy',
```

Deployment is now taking less than two minutes, mostly due to the repo size.  Much more acceptable.
