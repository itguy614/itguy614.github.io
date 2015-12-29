---
layout: post
title: Sublime Text Setup
categories: ['development']
---
I had to recently reinstall Sublime Text and had to remember how I had the application setup and with what packages.  I normally keep these linked to a folder in my ownCloud however for some reason these were missing.

### Install Package Control ###

This extension allows you to easily add additional extensions to your Sublime Text installation.

Press ```ctrl+` ``` to open the Python console.  Past the following code for Sublime Text 3.

```python
import urllib.request,os,hashlib; h = 'eb2297e1a458f27d836c04bb0cbaf282' + 'd0e7a3098092775ccb37ca9d6b2e4b7d'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
```

More information can be found on the [Package Control](https://sublime.wbond.net) website.

### Install Useful Extensions ###

- Advanced New File
- Alignment
- Bracket Highlighter
- DocBlockr
- Editor Config
- Git Gutter
- Git Gutter - Edge
- Jekyll
- PHP-Twig
- Sidebar Enhancements
- Theme - Spacegray
- Todo Review
- Trailing Spaces

### Apply A Starting Config ###

Paste the following into your user configuration.

```json
{
     "always_prompt_for_file_reload": false,
     "always_show_minimap_viewport": true,
     "auto_close_tags": false,
     "bold_folder_labels": true,
     "caret_extra_bottom": 2,
     "caret_extra_top": 2,
     "caret_extra_width": 2,
     "caret_style": "phase",
     "close_windows_when_empty": false,
     "color_scheme": "Packages/Theme - Spacegray/base16-ocean.dark.tmTheme",
     "create_window_at_startup": true,
     "draw_minimap_border": true,
     "fade_fold_buttons": true,
     "fold_buttons": true,
     "font_face": "Source Code Pro",
     "font_options":
     [
          "subpixel_antialias"
     ],
     "font_size": 15,
     "highlight_line": true,
     "highlight_modified_tabs": true,
     "hot_exit": false,
     "ignored_packages":
     [
          "GitGutter",
          "SideBarEnhancements",
          "IndentGuides",
          "Vintage"
     ],
     "line_padding_bottom": 1,
     "line_padding_top": 1,
     "open_files_in_new_window": true,
     "remember_open_files": false,
     "rulers":
     [
          80,
          132
     ],
     "show_encoding": true,
     "show_full_path": true,
     "show_line_endings": true,
     "tab_size": 4,
     "theme": "Spacegray.sublime-theme",
     "todo":
     {
          "case_sensitive": true,
          "file_exclude_patterns":
          [
               "*.js",
               "*.txt"
          ],
          "folder_excude_patters":
          [
               "cache",
               "logs"
          ],
          "patterns":
          {
               "AWESOME": "AWESOME[\\s]*?:+(?P<awesome>.*)$",
               "BUG": "BUG[\\s]*?:+(?P<bug>.*)$"
          }
     },
     "translate_tabs_to_spaces": true,
     "trim_trailing_white_space_on_save": true
}
```
